import { StepResponse, createStep } from "@medusajs/workflows-sdk"

import { CreateInventoryItemInput } from "@medusajs/types"
import { IInventoryServiceNext } from "@medusajs/types"
import { InventoryNext } from "@medusajs/types"
import { ModuleRegistrationName } from "../../../../modules-sdk/dist"
import { promiseAll } from "@medusajs/utils"

export const createInventoryItemsStepId = "create-inventory-items"
export const createInventoryItemsStep = createStep(
  createInventoryItemsStepId,
  async (data: InventoryNext.CreateInventoryItemInput[], { container }) => {
    const inventoryService: IInventoryServiceNext = container.resolve(
      ModuleRegistrationName.INVENTORY
    )

    const createdItems: InventoryNext.InventoryItemDTO[] =
      await inventoryService.create(data)

    return new StepResponse(
      createdItems,
      createdItems.map((i) => i.id)
    )
  },
  async (data: string[] | undefined, { container }) => {
    if (!data?.length) {
      return
    }

    const inventoryService = container.resolve(ModuleRegistrationName.INVENTORY)

    await inventoryService!.delete(data)
  }
)
