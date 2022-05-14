import { ProtocolData } from './reducer'
import { createAction } from '@reduxjs/toolkit'
import { ChartDayData, Transaction } from 'types'

// protocol wide info
export const updateProtocolData = createAction<{ protocolData: ProtocolData }>('protocol/updateProtocolData')
export const updateChartData = createAction<{ chartData: ChartDayData[] }>('protocol/updateChartData')
export const updateTransactions = createAction<{ transactions: Transaction[] }>('protocol/updateTransactions')
