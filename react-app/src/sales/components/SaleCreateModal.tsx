import { useEffect, useState } from 'react'
import { Modal, Form, Select, DatePicker, message } from 'antd'
import axios from 'axios'
import { API_BASE_URL } from '../../api/config'
import type { CreateSaleModel } from '../SaleModel'

interface SaleCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (values: CreateSaleModel) => Promise<void>
}

export function SaleCreateModal({ isOpen, onClose, onCreate }: SaleCreateModalProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  
  // États locaux pour les options des Select
  const [clients, setClients] = useState<{ label: string; value: number }[]>([])
  const [books, setBooks] = useState<{ label: string; value: string }[]>([])

  useEffect(() => {
    if (isOpen) {
      form.resetFields()
      
      // Charger les clients pour le Select
      axios.get(`${API_BASE_URL}/clients`).then(res => {
        setClients(res.data.map((c: any) => ({
          label: `${c.firstName} ${c.lastName}`,
          value: c.id
        })))
      }).catch(e => console.error("Erreur chargement clients", e))

      // Charger les livres pour le Select
      axios.get(`${API_BASE_URL}/books`).then(res => {
        const booksData = Array.isArray(res.data) ? res.data : (res.data.data || [])
        setBooks(booksData.map((b: any) => ({
          label: b.title,
          value: b.id
        })))
      }).catch(e => console.error("Erreur chargement livres", e))
    }
  }, [isOpen, form])

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
      // message.error géré par l'appelant ou ici si besoin
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