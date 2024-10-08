import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { json } from "react-router-dom"
import { RouteDrawer } from "../../../components/route-modal"
import { EditStoreForm } from "./components/edit-store-form/edit-store-form"
import { useV2Store } from "../../../lib/api-v2"

export const StoreEdit = () => {
  const { t } = useTranslation()
  const { store, isLoading, isError, error } = useV2Store({})

  if (isError) {
    throw error
  }

  if (!store && !isLoading) {
    throw json("An unknown error has occured", 500)
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <Heading className="capitalize">{t("store.editStore")}</Heading>
      </RouteDrawer.Header>
      {store && <EditStoreForm store={store} />}
    </RouteDrawer>
  )
}
