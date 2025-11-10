import { useEffect, useState } from 'react'
//import { Link , useNavigate } from '@tanstack/react-router' 
import { useNavigate } from '@tanstack/react-router'
import { Button, Modal, Space, Table, message, Avatar, Image } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { useClientProvider } from '../providers/useClientProvider'
import type { ClientListModel } from '../ClientModel'
import { ClientCreateModal } from '../components/ClientCreateModal' 

export function ClientListPage() {
  const { clients, loadClients, deleteClient, createClient } = useClientProvider()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate() 

  // Outil Ant Design pour les popups
  const [messageApi, contextHolder] = message.useMessage()
  const [modal, modalContextHolder] = Modal.useModal() 

  
  useEffect(() => {
    loadClients()
  }, []) 

  // Fonction pour afficher la modale de confirmation de suppression
  const showDeleteConfirm = (client: ClientListModel) => {
    modal.confirm({
      title: `Voulez-vous vraiment supprimer ${client.firstName} ${client.lastName} ?`,
      content: 'Cette action est irréversible.',
      okText: 'Supprimer',
      okType: 'danger',
      cancelText: 'Annuler',
      onOk: () => {
        handleDelete(client.id)
      },
    })
  }

  // Logique de suppression
  const handleDelete = (id: number) => {
    try {
      deleteClient(id)
      messageApi.success('Client supprimé avec succès')
    } catch (error) {
      messageApi.error('Erreur lors de la suppression du client')
      console.error(error)
    }
  }

  // Définition des colonnes pour le tableau Ant Design
  const columns: TableProps<ClientListModel>['columns'] = [
    {
      title: 'Photo',
      dataIndex: 'photoUrl',
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
      // Affichage du nom et prénom
      render: (_, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Livres Achetés', //
      dataIndex: 'booksPurchasedCount',
      key: 'booksPurchasedCount',
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
          Créer un client
        </Button>
      </Space>

      {/* La liste des clients */}
      <Table
        columns={columns}
        dataSource={clients}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            // Permet de cliquer sur la ligne pour naviguer
            const target = e.target as HTMLElement
            // Empêche la navigation si on clique sur un bouton ou un lien dans la ligne
            if (target.closest('button') || target.closest('a')) return
            
            navigate({ to: '/clients/$clientId', params: { clientId: String(record.id) } })
          },
          style: { cursor: 'pointer' }
        })}
      />

      {/* La modale de création */}
      <ClientCreateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={async (values) => { 
          try {
            await createClient(values) 
            messageApi.success('Client créé avec succès')
            setIsModalOpen(false) 
          } catch (error) {
            messageApi.error('Erreur lors de la création')
          }
        }}
      />
    </>
  )
}