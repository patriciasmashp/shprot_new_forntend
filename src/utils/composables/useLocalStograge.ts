import { ref, watch } from "vue"
import type { Ref } from "vue"
export default function useLocalStorage<T>(key: string, defaultValue: T = {} as T): Ref<T> {
    const store = localStorage.getItem(key)

    const data = ref(store ? JSON.parse(store) : defaultValue)
    

    watch(data, (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
    }, { deep: true })

    return data
}