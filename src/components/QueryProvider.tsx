"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC } from 'react'

const client = new QueryClient()
const QueryProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
      )
}

export default QueryProvider