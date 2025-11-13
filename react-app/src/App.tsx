import { useEffect, useState } from 'react'
import { Card, Col, Row, Statistic, Typography, Space, Divider } from 'antd'
import { 
  ReadOutlined, 
  UserOutlined, 
  TeamOutlined, 
  ShoppingOutlined, 
  ArrowRightOutlined 
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import { API_BASE_URL } from './api/config'

const { Title, Paragraph } = Typography

function App() {

  // État uniquement pour le nombre de livres (les autres sont statiques pour le moment)
  const [bookCount, setBookCount] = useState<number>(0)

  useEffect(() => {
    // Appel l'endpoint spécifique pour les livres
    axios.get(`${API_BASE_URL}/books/count`)
      .then(response => {
        // On s'assure de récupérer un nombre
        const count = typeof response.data === 'number' ? response.data : response.data.count
        setBookCount(Number(count))
      })
      .catch(error => {
        console.error("Erreur lors du chargement du nombre de livres :", error)
      })
  }, [])
  
  
  const stats = [
    {
      title: 'Livres en rayon',
      value: bookCount,
      icon: <ReadOutlined style={{ color: '#1890ff', fontSize: '24px' }} />,
      link: '/books',
      linkText: 'Gérer les livres',
    },
    {
      title: 'Auteurs référencés',
      value: 45, // Exemple
      icon: <UserOutlined style={{ color: '#52c41a', fontSize: '24px' }} />,
      link: '/authors',
      linkText: 'Voir les auteurs',
    },
    {
      title: 'Clients inscrits',
      value: 89, // Exemple
      icon: <TeamOutlined style={{ color: '#faad14', fontSize: '24px' }} />,
      link: '/clients',
      linkText: 'Gérer les clients',
    },
    {
      title: 'Ventes réalisées',
      value: 312, // Exemple
      icon: <ShoppingOutlined style={{ color: '#f5222d', fontSize: '24px' }} />,
      link: '/sales',
      linkText: 'Suivre les ventes',
    },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* En-tête de la page d'accueil */}
      <div style={{ textAlign: 'left', marginBottom: 40 }}>
        <Title level={2}>Bienvenue sur Biblio M1</Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Vous pouvez parcourir les différentes sections via le menu de navigation.
        </Paragraph>
      </div>

      <Divider orientation="left">Vue d'ensemble</Divider>

      {/* Grille de cartes statistiques */}
      <Row gutter={[16, 16]}>
        {stats.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable style={{ height: '100%' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Statistic title={item.title} value={item.value} />
                  {item.icon}
                </div>
                <div style={{ marginTop: 16, textAlign: 'right' }}>
                  <Link to={item.link} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {item.linkText} <ArrowRightOutlined />
                  </Link>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      
    </div>
  )
}

export default App