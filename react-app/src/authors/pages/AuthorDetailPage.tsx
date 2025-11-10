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
  Statistic, // Pour afficher le nombre moyen de ventes
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { useAuthorDetailsProvider } from '../providers/useAuthorDetailsProvider'
import type { BookForAuthor } from '../AuthorModel' // Le type que nous avons créé

const { Title, Paragraph } = Typography

export function AuthorDetailPage() {
  // 1. Récupérer l'ID de l'auteur depuis l'URL
  const { authorId } = useParams({ from: '/authors/$authorId' })
  
  // 2. Utiliser notre hook "détail" pour charger les données
  const { isLoading, author, loadAuthor } = useAuthorDetailsProvider(authorId)

  const [messageApi, contextHolder] = message.useMessage()

  // 3. Charger les données au montage (comme pour vos livres)
  useEffect(() => {
    loadAuthor()
  }, [authorId, loadAuthor])

  // 4. Gérer l'édition "inline"
  const handleEdit = (field: string, value: string) => {
    // TODO: Implémenter la logique d'update (via le provider)
    console.log('Mise à jour (à implémenter):', { [field]: value })
    messageApi.success('Modification enregistrée (simulation)')
  }

  // 5. Colonnes pour la liste des livres écrits
  const columns: TableProps<BookForAuthor>['columns'] = [
    {
      title: 'Titre du Livre',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: BookForAuthor) => (
        // Lien vers la page du livre
        <Link to="/books/$bookId" params={{ bookId: record.id }}>
          {text}
        </Link>
      ),
    },
    {
      title: 'Année',
      dataIndex: 'yearPublished',
      key: 'yearPublished',
    },
  ]

  // Affiche un squelette pendant le chargement
  if (isLoading) {
    return <Skeleton active avatar paragraph={{ rows: 4 }} />
  }

  // Affiche un message si l'auteur n'est pas trouvé
  if (!author) {
    return (
      <Title level={3}>Auteur non trouvé.</Title>
    )
  }

  // Affiche les détails de l'auteur
  return (
    <>
      {contextHolder}
      <Card style={{ marginBottom: 24 }}>
        <Card.Meta
          avatar={
            <Avatar
              size={64}
              src={author.photo ? <Image src={author.photo} preview={false} /> : null}
              icon={!author.photo ? <UserOutlined /> : null}
            />
          }
          title={`${author.firstName} ${author.lastName}`}
          description="Détails de l'auteur"
        />
      </Card>

      <Descriptions title="Informations" bordered layout="vertical">
        <Descriptions.Item label="Prénom">
          <Paragraph editable={{ onChange: (value) => handleEdit('firstName', value) }}>
            {author.firstName}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Nom">
          <Paragraph editable={{ onChange: (value) => handleEdit('lastName', value) }}>
            {author.lastName}
          </Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label="Ventes moyennes">
          <Statistic value={author.averageSales} precision={2} />
        </Descriptions.Item>
        <Descriptions.Item label="URL Photo" span={3}>
          <Paragraph editable={{ onChange: (value) => handleEdit('photo', value) }}>
            {author.photo || 'N/A'}
          </Paragraph>
        </Descriptions.Item>
      </Descriptions>

      <Title level={4} style={{ marginTop: 32 }}>
        Livres Écrits
      </Title>
      <Table
        columns={columns}
        dataSource={author.books} // Utilise la liste de livres de l'auteur
        rowKey="id"
        pagination={false}
      />
    </>
  )
}