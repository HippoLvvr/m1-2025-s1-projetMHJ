import { useEffect, useState } from 'react'
import { Modal, Form, Input } from 'antd'
import type { CreateAuthorModel } from '../AuthorModel' // Les types que nous avons créés

interface AuthorCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (values: CreateAuthorModel) => Promise<void> // Suit le même modèle que vos autres modales
}

export function AuthorCreateModal({ isOpen, onClose, onCreate }: AuthorCreateModalProps) {
  const [form] = Form.useForm<CreateAuthorModel>()
  const [loading, setLoading] = useState<boolean>(false)

  // Réinitialise le formulaire quand la modale s'ouvre
  useEffect(() => {
    if (isOpen) {
      form.resetFields()
    }
  }, [isOpen, form])

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      await onCreate(values) // Appelle la fonction du provider
      onClose() // Ferme la modale si la création réussit
    } catch (info) {
      console.log('Erreur de validation:', info)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Créer un nouvel auteur"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={loading}
      okText="Créer"
      cancelText="Annuler"
    >
      <Form form={form} layout="vertical" name="create_author_form">
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
          name="photo"
          label="URL de la photo (facultatif)"
          rules={[{ type: 'url', message: "L'URL n'est pas valide" }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>
      </Form>
    </Modal>
  )
}