import { ref } from "vue";
import { defineStore } from "pinia";
import { useCurrencyApi } from "@/api/currency";
import { ICurrency } from "@/types/currency";

export const useCurrencyStore = defineStore("currency", () => {
  const api = useCurrencyApi()
  const allCurrencies = ref<Array<ICurrency>>([])

  const loadAllCurrencies = async (): Promise<Array<ICurrency>> => {
    const currencies = await api.getAllCurrencies()
    if (currencies.length > 0) {
      allCurrencies.value = currencies
      return allCurrencies.value
    }
    return []
  }

  const deleteCurrency = async (id: number) => {
    await api.deleteCurrency(id)
  }

  const insertCurrency = async (currencyName: string) => {
    await api.insertCurrency(currencyName)
  }

  return {
    allCurrencies,
    deleteCurrency,
    insertCurrency,
    loadAllCurrencies,
  }
})
