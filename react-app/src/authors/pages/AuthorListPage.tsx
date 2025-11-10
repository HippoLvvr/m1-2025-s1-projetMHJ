import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button, Modal, Space, Table, message, Avatar, Image } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import type { AuthorListModel } from '../AuthorModel'
import { AuthorCreateModal } from '../components/AuthorCreateModal' // Cet import est maintenant correct

export function AuthorListPage() {
  const { authors, loadAuthors, deleteAuthor, createAuthor } = useAuthorProvider()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  // Outils Ant Design pour les popups
  const [messageApi, contextHolder] = message.useMessage()
  const [modal, modalContextHolder] = Modal.useModal() // Pour la confirmation de suppression

  // Charger les auteurs au premier rendu de la page
  useEffect(() => {
    loadAuthors()
  }, []) // Le tableau vide signifie "une seule fois au montage"

  // Fonction pour afficher la modale de confirmation de suppression
  const showDeleteConfirm = (author: AuthorListModel) => {
    modal.confirm({
      title: `Voulez-vous vraiment supprimer ${author.firstName} ${author.lastName} ?`,
      content: 'Cette action est irréversible.',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: () => {
        handleDelete(author.id)
      },
    })
  }

  // Logique de suppression
  const handleDelete = (id: string) => { // L'ID est un string
    try {
      deleteAuthor(id)
      messageApi.success('Auteur supprimé avec succès')
    } catch (error) {
      messageApi.error("Erreur lors de la suppression de l'auteur")
      console.error(error)
    }
  }

  // Définition des colonnes pour le tableau Ant Design
  const columns: TableProps<AuthorListModel>['columns'] = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photoUrl: string | undefined) => (
        <Avatar 
          src={photoUrl ? <Image src={photoUrl} preview={false} /> : null} 
          icon={!photoUrl ? <UserOutlined /> : null} 
        />
      )
    },
    {
      title: 'Nom',
      key: 'name',
      render: (_, record) => (
        // Lien vers la page de détail
        <Link to="/authors/$authorId" params={{ authorId: record.id }}>
          {record.firstName} {record.lastName}
        </Link>
      ),
    },
    {
      title: 'Livres Écrits',
      dataIndex: 'booksWrittenCount',
      key: 'booksWrittenCount',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Bouton de suppression */}
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => {
              e.stopPropagation() // Empêche le clic de déclencher la navigation
              showDeleteConfirm(record)
            }}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      {contextHolder}
      {modalContextHolder}

      <Space style={{ width: '100%', justifyContent: 'flex-end', marginBottom: 16 }}>
        {/* Bouton pour ouvrir la modale de création */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Créer un auteur
        </Button>
      </Space>

      {/* La liste des auteurs */}
      <Table
        columns={columns}
        dataSource={authors}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            const target = e.target as HTMLElement
            if (target.closest('button') || target.closest('a')) return
            
            // Navigation au clic sur la ligne
            navigate({ to: '/authors/$authorId', params: { authorId: record.id } })
          },
          style: { cursor: 'pointer' }
        })}
      />

      {/* La modale de création */}
      <AuthorCreateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async (values) => {
          try {
            await createAuthor(values) 
            messageApi.success('Auteur créé avec succès')
            setIsModalOpen(false)
          } catch (error) {
            messageApi.error('Erreur lors de la création')
          }
        }}
      />
    </>
  )
}