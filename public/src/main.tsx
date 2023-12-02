import ReactDOM from 'react-dom/client'
import {Register,Login,Protect,SetAvatar,Chats,Chat} from "./pages"

import "./index.css"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path:"/",
    element:<Protect><Chats/></Protect>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/setavatar",
    element:<SetAvatar/>
  },
  {
    path:"/chat/:id",
    element:<Chat/>
  }
  ])
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
