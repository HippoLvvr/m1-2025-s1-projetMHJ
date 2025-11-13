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
  // On récupère l'id du client depuis l'URL
  const { clientId } = useParams({ from: '/clients/$clientId' })

  // On charge les données depuis le provider
  const { isLoading, client, loadClient } = useClientDetailsProvider(clientId)

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    loadClient()
  }, [clientId, loadClient])

  const handleEdit = (field: string, value: string) => {
    console.log('Mise à jour (à implémenter):', { [field]: value })
    messageApi.success('Modification enregistrée (simulation)')
  }

  // Colonnes du tableau des ventes
  const columns: TableProps<Sale>['columns'] = [
    {
      title: 'Livre',
      dataIndex: ['book', 'title'],
      key: 'bookTitle',
      render: (text: string, record: Sale) => (
        <Link to="/books/$bookId" params={{ bookId: String(record.book.id) }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Auteur',
      dataIndex: ['book', 'authorId'],
      key: 'authorId',
      render: (authorId?: string) =>
        authorId ? (
          <Link to="/authors/$authorId" params={{ authorId }}>
            Voir l’auteur
          </Link>
        ) : (
          'N/A'
        ),
    },
    {
      title: "Date d'achat",
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  if (isLoading) {
    return <Skeleton active avatar paragraph={{ rows: 4 }} />
  }

  if (!client) {
    return <Title level={3}>Client non trouvé.</Title>
  }

  return (
    <>
      {contextHolder}
      <Card style={{ marginBottom: 24 }}>
        <Card.Meta
          avatar={
            <Avatar
              size={64}
              src={
                client.photoUrl ? (
                  <Image src={client.photoUrl} preview={false} />
                ) : undefined
              }
              icon={!client.photoUrl ? <UserOutlined /> : undefined}
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
        dataSource={client.sales}
        rowKey="id"
        pagination={false}
      />
    </>
  )
}
