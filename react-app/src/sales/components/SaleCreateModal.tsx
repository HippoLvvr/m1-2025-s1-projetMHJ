import { useEffect, useState } from 'react'
import { Modal, Form, Select, DatePicker, message } from 'antd'
import axios from 'axios'
import { API_BASE_URL } from '../../api/config'
import type { CreateSaleModel } from '../SaleModel'

interface SaleCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (values: CreateSaleModel) => Promise<void>
  preselectedBookId?: string 
}

export function SaleCreateModal({ isOpen, onClose, onCreate, preselectedBookId }: SaleCreateModalProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  
  const [clients, setClients] = useState<{ label: string; value: number }[]>([])
  const [books, setBooks] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      
      // Si un livre est présélectionné, on maj du formulaire
      if (preselectedBookId) {
        form.setFieldValue('bookId', preselectedBookId)
      }
      
      // Charger les clients
      axios.get(`${API_BASE_URL}/clients`).then(res => {
        setClients(res.data.map((c: any) => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
        })))
      }).catch(e => console.error("Erreur chargement clients", e))

      // Charger les livres avec une limite de 100
      axios.get(`${API_BASE_URL}/books`, {
        params: { limit: 100 } 
      }).then(res => {
        const booksData = Array.isArray(res.data) ? res.data : (res.data.data || [])
        setBooks(booksData.map((b: any) => ({
          label: b.title,
          value: b.id
        })))
      }).catch(e => console.error("Erreur chargement livres", e))
    }
  }, [isOpen, form, preselectedBookId])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      const payload: CreateSaleModel = {
        clientId: values.clientId,
        bookId: values.bookId,
        date: values.date.format('YYYY-MM-DD'),
      }

      await onCreate(payload)
      message.success('Vente enregistrée')
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Nouvelle vente"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Enregistrer"
      cancelText="Annuler"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="clientId"
          label="Client"
          rules={[{ required: true, message: 'Client requis' }]}
        >
          <Select
            showSearch
            placeholder="Sélectionner un client"
            optionFilterProp="label"
            options={clients}
          />
        </Form.Item>

        <Form.Item
          name="bookId"
          label="Livre"
          rules={[{ required: true, message: 'Livre requis' }]}
        >
          <Select
            showSearch
            placeholder="Sélectionner un livre"
            optionFilterProp="label"
            options={books}
            disabled={!!preselectedBookId} // On désactive le choix si le livre est pré-sélectionné
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Date requise' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  )
}