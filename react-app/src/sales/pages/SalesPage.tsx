import { useEffect, useState } from 'react'
import { Table, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { useSaleProvider } from '../providers/useSaleProvider'
import { SaleCreateModal } from '../components/SaleCreateModal'
import type { SaleListModel } from '../SaleModel'

export function SalesPage() {
  const { sales, loadSales, isLoading, createSale } = useSaleProvider()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadSales()
  }, [loadSales])

  const columns: TableProps<SaleListModel>['columns'] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'ID Client',
      dataIndex: 'clientId',
      key: 'clientId',
    },
    {
      title: 'ID Livre',
      dataIndex: 'bookId',
      key: 'bookId',
    },
  ]

  return (
    <>
      <Space style={{ width: '100%', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Enregistrer une vente
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={sales}
        rowKey="id"
        loading={isLoading}
      />

      <SaleCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createSale}
      />
    </>
  )
}