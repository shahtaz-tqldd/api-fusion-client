import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/routes"
import { Toaster } from "react-hot-toast"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={routes} />
      <Toaster />
    </DndProvider>
  )
}

export default App
