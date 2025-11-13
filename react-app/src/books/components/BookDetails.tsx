import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeftOutlined,
  UserOutlined,
  ShoppingOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Card,
  Divider,
  Image,
  List,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { Route as booksRoute } from '../../routes/books'
import type { BookDetailsModel } from '../BookModel'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  // On caste le livre en BookDetailsModel pour accéder à la propriété 'purchasers'
  
  const bookDetails = book as unknown as BookDetailsModel

  return (
    <div style={{ textAlign: 'left', maxWidth: 1000, margin: '0 auto' }}>
      {/* Bouton retour */}
      <Link to={booksRoute.to} style={{ display: 'inline-block', marginBottom: 16 }}>
        <Space>
          <ArrowLeftOutlined />
          Retour à la liste
        </Space>
      </Link>

      {/* Carte principale : Infos Livre + Auteur + Image */}
      <Card>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          
          {/* Conteneur Image (Url) */}
          <div style={{ 
            width: 200, 
            minWidth: 200,
            height: 300, 
            background: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid #f0f0f0'
          }}>
            {bookDetails?.photo ? (
              <Image
                width={200}
                height={300}
                src={bookDetails.photo}
                alt={bookDetails.title}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Typography.Text type="secondary">Pas d'image</Typography.Text>
            )}
          </div>

          {/* Informations Textuelles */}
          <Space direction="vertical" size="middle" style={{ flex: 1 }}>
            <div>
              {/* Titre du livre (Nom) */}
              <Typography.Title level={2} style={{ margin: 0 }}>
                {bookDetails?.title}
              </Typography.Title>
              <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                Publié en {bookDetails?.yearPublished}
              </Typography.Text>
            </div>

            {/* Section Auteur */}
            <div style={{ marginTop: 16 }}>
              <Typography.Title level={5} style={{ margin: '0 0 8px 0' }}>Auteur</Typography.Title>
              <Space align="center">
                <Avatar size="large" icon={<UserOutlined />} />
                <Typography.Text strong style={{ fontSize: 18 }}>
                  {bookDetails?.author?.firstName} {bookDetails?.author?.lastName}
                </Typography.Text>
              </Space>
            </div>
          </Space>
        </div>
      </Card>

      <Divider orientation="left">
        <Space>
          <ShoppingOutlined />
          Historique des achats
        </Space>
      </Divider>

      {/* Liste des acheteurs */}
      <List
        itemLayout="horizontal"
        dataSource={bookDetails?.purchasers || []}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
              title={`${item.firstName} ${item.lastName}`}
              description={
                item.purchaseDate 
                  ? `Acheté le ${new Date(item.purchaseDate).toLocaleDateString()}`
                  : 'Date inconnue'
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: 'Aucun achat enregistré pour ce livre.' }}
        bordered
        style={{ background: '#fff' }}
      />
    </div>
  )
}