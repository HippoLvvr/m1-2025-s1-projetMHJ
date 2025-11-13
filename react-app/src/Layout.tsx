import { Link, useRouterState } from '@tanstack/react-router'
import {
  BookOutlined,
  HomeOutlined,
  TeamOutlined, // L'icône pour les "Clients"
  UserOutlined, // L'icône pour les "Auteurs"
  ShoppingOutlined, // L'icône pour les "Ventes"
} from '@ant-design/icons'
import { Layout as AntLayout, Menu, Breadcrumb } from 'antd' 
import type { MenuProps } from 'antd'
import React from 'react' 

const { Header, Content, Sider } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}


const menuItems: MenuProps['items'] = [
  {
    label: <Link to="/">Accueil</Link>,
    key: '/', // La clé est le chemin de la route
    icon: <HomeOutlined />,
  },
  {
   
    label: <Link to="/clients">Clients</Link>,
    key: '/clients',
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/books">Livres</Link>,
    key: '/books',
    icon: <BookOutlined />,
  },
  {
    
    label: <Link to="/authors">Auteurs</Link>,
    key: '/authors',
    icon: <UserOutlined />,
  },
  
  {
  label: <Link to="/sales">Ventes</Link>,
  key: '/sales',
  icon: <ShoppingOutlined />,
  },
]

export function Layout({ children }: LayoutProps) {
  const { location } = useRouterState()

  
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Accueil</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      // à faire : Améliorer ceci pour afficher les noms 
      // au lieu des IDs 
      const title = snippet.charAt(0).toUpperCase() + snippet.slice(1)
      
      return (
        <Breadcrumb.Item key={url}>
          {/* Le dernier item n'est pas un lien */}
          {index === pathSnippets.length - 1 ? (
            title
          ) : (
            <Link to={url}>{title}</Link>
          )}
        </Breadcrumb.Item>
      )
    }),
  ]
  

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* Sider: Le menu de navigation vertical */}
      <Sider collapsible>
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          textAlign: 'center',
          lineHeight: '32px',
          borderRadius: 6
        }}>
          Biblio M1
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          // Fait en sorte que le bon item soit surligné
          selectedKeys={[location.pathname]} 
        />
      </Sider>
      
      {/* Layout principal (droite) */}
      <AntLayout>
        {/* Header: L'en-tête avec le fil d'Ariane */}
        <Header style={{ padding: '0 16px', background: '#ffffff' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
          </Breadcrumb>
        </Header>
        
        <Content style={{ margin: '16px', padding: 24, background: '#ffffff' }}>
          
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}