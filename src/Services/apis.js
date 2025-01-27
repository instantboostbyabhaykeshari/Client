const baseUrl = import.meta.env.VITE_API_URL;

export const auth = {
    SIGNUP_API: `${baseUrl}/signUp`
}

export const order = {
    ALL_ORDER: `${baseUrl}/order/allOrder`
}

export const category = {
    ALL_CATEGORY: `${baseUrl}/api/category/showAllCategories`
}