import { useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'
import type { CreateClientModel } from '../ClientModel'

interface ClientCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (values: CreateClientModel) => Promise<void>
}

export function ClientCreateModal({ isOpen, onClose, onCreate }: ClientCreateModalProps) {
  const [form] = Form.useForm<CreateClientModel>()
  const [loading, setLoading] = useState<boolean>(false)

  // Réinitialise le formulaire quand la modale s'ouvre
  useEffect(() => {
    if (isOpen) {
      form.resetFields()
    }
  }, [isOpen, form])

  const handleOk = async () => {
    try {
      // Valide les champs du formulaire
      const values = await form.validateFields()
      setLoading(true)
      
      // Appelle la fonction de création (du provider)
      await onCreate(values)
      
      onClose() // Ferme la modale si la création réussit
    } catch (info) {
      console.log('Erreur de validation:', info)
      // Ne ferme pas la modale si la validation échoue
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Modal
      title="Créer un nouveau client"
      open={isOpen} 
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Créer"
      cancelText="Annuler"
    >
      <Form form={form} layout="vertical" name="create_client_form">
        <Form.Item
          name="firstName"
          label="Prénom"
          rules={[{ required: true, message: 'Veuillez entrer le prénom' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Nom"
          rules={[{ required: true, message: 'Veuillez entrer le nom' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email (facultatif)"
          rules={[{ type: 'email', message: "L'email n'est pas valide" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="photoUrl"
          label="URL de la photo (facultatif)"
          rules={[{ type: 'url', message: "L'URL n'est pas valide" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}