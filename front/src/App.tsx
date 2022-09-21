import {
  Button,
  Checkbox,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  isDone: number
}

export const App = () => {
  // const dispatch = useDispatch<AppDispatch>()
  // const todos: TodoItem[] = useSelector(
  //   (state: RootState) => state.todos.todoItems,
  // )
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 0,
      title: '',
      isDone: 0,
    },
  ])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/todo/')
      .then((response) => {
        console.log(response)
        setTodos(response.data)
      })
      .catch((error) => console.log(error))
    // dispatch(fetchAllTodos())
  }, [])

  const [title, setTitle] = useState<string>('')
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const [isDone, setIsDone] = useState<number>(0)

  const createNewTodo = (): void => {
    setLoading(true)
    axios
      .post('http://localhost:8000/api/todo/', {
        title: title,
        isDone: isDone,
      })
      .then((response) => {
        setTodos([...todos, response.data])
        setLoading(false)
      })
      .then(() => {
        setIsDone(0)
        setTitle('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTodo = (id: number) => {
    setLoading(true)
    axios
      .delete(`http://localhost:8000/api/todo/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id))
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }

  const modifyIsDone = (id: number, title: string) => {
    setLoading(true)
    axios
      .patch(`http://localhost:8000/api/todo/${id}`, {
        title: title,
        isDone: 1,
      })
      .then((response) => {
        console.log(response.data)
        setTodos(response.data)
        setLoading(false)
      })
      .then(() => {
        setIsDone(0)
        setTitle('')
      })
      .catch((error) => console.log(error))
  }

  if (loading) {
    return (
      <Stack alignItems={'center'} mt={20}>
        <Spinner size="xl" />
      </Stack>
    )
  }

  return (
    <Stack alignItems="center">
      <Text fontSize="4xl">TODOAPP</Text>
      <Stack>
        {todos.map((todo) => (
          <HStack key={todo.id} justifyContent={'space-between'}>
            {todo.isDone === 0 ? (
              <Text>{todo.title}</Text>
            ) : (
              <Text color="green.500" as="del">
                {todo.title}
              </Text>
            )}

            <HStack spacing={4}>
              <Checkbox
                size="lg"
                defaultChecked={todo.isDone === 1}
                colorScheme="orange"
                readOnly={todo.isDone === 1}
                onChange={() => modifyIsDone(todo.id, todo.title)}
              />
              <Button
                colorScheme="red"
                textColor="white"
                onClick={() => deleteTodo(todo.id)}
                size={'sm'}
              >
                削除
              </Button>
            </HStack>
          </HStack>
        ))}
      </Stack>

      <Stack w="50%">
        <Text fontSize="sm">タイトル</Text>
        <Input value={title} onChange={handleTitleChange} />
      </Stack>
      <Button colorScheme="green" onClick={createNewTodo}>
        追加
      </Button>
    </Stack>
  )
}
