import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeftOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  List,
  Skeleton,
  Space,
  Typography,
} from 'antd'
import axios from 'axios' //
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { Route as booksRoute } from '../../routes/books'
import type { BookDetailsModel } from '../BookModel'
import { SaleCreateModal } from '../../sales/components/SaleCreateModal' // Import de la modale
import { API_BASE_URL } from '../../api/config'
import type { CreateSaleModel } from '../../sales/SaleModel'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  // État pour gérer l'ouverture de la modale d'achat
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  const bookDetails = book as unknown as BookDetailsModel

  // Fonction pour créer la vente via l'API directement
  const handleCreateSale = async (values: CreateSaleModel) => {
    try {
      await axios.post(`${API_BASE_URL}/sales`, values)
      // On recharge les détails du livre pour voir le nouvel acheteur apparaître dans la liste
      loadBook() 
    } catch (error) {
      console.error("Erreur lors de l'achat", error)
      throw error // Permet à la modale de gérer l'état d'erreur si nécessaire
    }
  }

  return (
    <div style={{ textAlign: 'left', maxWidth: 1000, margin: '0 auto' }}>
      <Link to={booksRoute.to} style={{ display: 'inline-block', marginBottom: 16 }}>
        <Space>
          <ArrowLeftOutlined />
          Retour à la liste
        </Space>
      </Link>

      <Card>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
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

          <Space direction="vertical" size="middle" style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {bookDetails?.title}
                </Typography.Title>
                <Typography.Text type="secondary" style={{ fontSize: 16 }}>
                  Publié en {bookDetails?.yearPublished}
                </Typography.Text>
              </div>
              
              {/* Bouton Acheter */}
              <Button 
                type="primary" 
                icon={<DollarOutlined />} 
                size="large"
                onClick={() => setIsBuyModalOpen(true)}
              >
                Acheter ce livre
              </Button>
            </div>

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

      {/* Modale d'achat avec le livre pré-sélectionné */}
      <SaleCreateModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onCreate={handleCreateSale}
        preselectedBookId={bookDetails?.id} 
      />
    </div>
  )
}