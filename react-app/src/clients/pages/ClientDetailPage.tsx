import { useEffect } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import {
  Avatar,
  Card,
  Descriptions,
  Image,
  Skeleton,
  Table,
  Typography,
  message,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import type { Sale } from '../ClientModel' 

const { Title, Paragraph } = Typography

export function ClientDetailPage() {
  // on récup l'id du client depuis l'URL
  const { clientId } = useParams({ from: '/clients/$clientId' })
  
  // on utilise details pour charger les données
  const { isLoading, client, loadClient } = useClientDetailsProvider(clientId)

  //Outil pour les message
  const [messageApi, contextHolder] = message.useMessage()

  // si l'ID change
  useEffect(() => {
    loadClient()
  }, [clientId, loadClient])

  
  const handleEdit = (field: string, value: string) => {
    // à faire : Implémenter la logique d'update
    // Il faudra appeler une fonction "updateClient" du provider
    console.log('Mise à jour (à implémenter):', { [field]: value })
    messageApi.success('Modification enregistrée (simulation)')
  }

  //Colonnes pour la liste des livres achetés
  const columns: TableProps<Sale>['columns'] = [
    {
      title: 'Livre',
      dataIndex: ['book', 'title'], // Accède à sale.book.title
      key: 'bookTitle',
      render: (text: string, record: Sale) => (
        // Lien vers la page du livre
        <Link to="/books/$bookId" params={{ bookId: String(record.book.id) }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Auteur',
      dataIndex: ['book', 'author'], // Accède à sale.book.author
      key: 'authorName',
      render: (author: Sale['book']['author']) =>
        `${author.firstName} ${author.lastName}`,
    },
    {
      title: "Date d'achat",
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  // Affiche un squelette pendant le chargement
  if (isLoading) {
    return <Skeleton active avatar paragraph={{ rows: 4 }} />
  }

  // Affiche un message si le client n'est pas trouvé
  if (!client) {
    return <Title level={3}>Client non trouvé.</Title>
  }

  // Affiche les détails du client
  return (
    <>
      {contextHolder}
      <Card style={{ marginBottom: 24 }}>
        <Card.Meta
          avatar={
            <Avatar
              size={64}
              src={client.photoUrl ? <Image src={client.photoUrl} preview={false} /> : null}
              icon={!client.photoUrl ? <UserOutlined /> : null}
            />
          }
          title={`${client.firstName} ${client.lastName}`}
          description="Détails du client"
        />
      </Card>

      <Descriptions title="Informations" bordered layout="vertical">
        <Descriptions.Item label="Prénom">
          <Paragraph editable={{ onChange: (value) => handleEdit('firstName', value) }}>
            {client.firstName}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Nom">
          <Paragraph editable={{ onChange: (value) => handleEdit('lastName', value) }}>
            {client.lastName}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <Paragraph editable={{ onChange: (value) => handleEdit('email', value) }}>
            {client.email || 'N/A'}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="URL Photo" span={2}>
          <Paragraph editable={{ onChange: (value) => handleEdit('photoUrl', value) }}>
            {client.photoUrl || 'N/A'}
          </Paragraph>
        </Descriptions.Item>
      </Descriptions>

      <Title level={4} style={{ marginTop: 32 }}>
        Livres Achetés
      </Title>
      <Table
        columns={columns}
        dataSource={client.sales} // Utilise les données de vente
        rowKey="id"
        pagination={false}
      />
    </>
  )
}