import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'

export type PopupContent = {
  listUpdate: {
    listUrl: string
    oldList: TokenList
    newList: TokenList
    auto: boolean
  }
}

export enum ApplicationModal {
  WALLET,
  SETTINGS,
  MENU,
  DASHBOARD_ADDRESSES,
}

export type ResizeAction = {
  screenWidth: number | null
  screenHeight: number | null
}

export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'application/addPopup'
)
export const removePopup = createAction<{ key: string }>('application/removePopup')
export const updateSubgraphStatus = createAction<{ available: boolean | null; syncedBlock: number | undefined }>(
  'application/updateSubgraphStatus'
)
export const updateWindowSize = createAction<{ screenWidth: number; screenHeight: number }>(
  'application/updateWindowSize'
)
