declare interface user {
  id: number,
  username: string,
  store_name: string,
  store_description: string,
  created_at: string,
  updated_at: string,
  rating: number,
}

interface menu {
  id: number,
  name: string,
  type: string,
  price: number,
  image: string,
  description: string,
  rating: number,
  created_at: string,
  updated_at: string,
  owner: user,
}

interface newMenu {
  name: string,
  type: string,
  price: number,
  image: string,
  description: string,
}

interface review {
  id: number,
  content: string,
  rating: number,
  created_at: string,
  updated_at: string,
  menu: menu,
  author: user,
}