import { useCallback, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks'
import { AppDispatch, AppState } from '../index'
import { addPopup, ApplicationModal, PopupContent, removePopup, setOpenModal, updateSubgraphStatus } from './actions'
import { bindActionCreators, ActionCreatorsMapObject } from 'redux'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal])
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useDashboardAddressesModalToggle(): () => void {
  return useToggleModal(ApplicationModal.DASHBOARD_ADDRESSES)
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}

// returns a function that allows adding a popup
export function useSubgraphStatus(): [
  {
    available: boolean | null
    syncedBlock: number | undefined
  },
  (available: boolean | null, syncedBlock: number | undefined) => void
] {
  const dispatch = useDispatch()
  const status = useSelector((state: AppState) => state.application.subgraphStatus)

  const update = useCallback(
    (available: boolean | null, syncedBlock: number | undefined) => {
      dispatch(updateSubgraphStatus({ available, syncedBlock }))
    },
    [dispatch]
  )
  return [status, update]
}

export const useLayoutSize = () => {
  const layoutSize = useSelector((state: AppState) => state.application.screen.screenSize)
  const isMobileLayout = !['LARGE', 'LARGE', 'NORMAL'].includes(layoutSize)
  return { isMobileLayout, layoutSize }
}

export const useActions = <M extends ActionCreatorsMapObject<any>>(actions: M) => {
  const dispatch = useDispatch()
  const ref = useRef(actions)
  return useMemo(() => bindActionCreators(ref.current, dispatch), [dispatch, ref])
}
