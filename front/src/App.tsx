import { Button, Checkbox, HStack, Input, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { fetchAllTodos } from './redux/todoSlice'
import { AppDispatch, RootState, TodoItem } from './redux/types'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const todos: TodoItem[] = useSelector(
    (state: RootState) => state.todos.todoItems,
  )

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [])

  const [title, setTitle] = useState<string>('')
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const [isDone, setIsDone] = useState<number>(0)

  const createNewTodo = (): void => {
    axios
      .post('http://localhost:8000/api/todo/', {
        title: title,
        isDone: isDone,
      })
      .then((response) => {})
      .then(() => {
        setIsDone(0)
        setTitle('')
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteTodo = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/todo/${id}`)
      .then(() => {
        window.location.reload()
      })
      .catch((error) => console.log(error))
  }

  const modifyIsDone = (id: number, title: string) => {
    axios
      .patch(`http://localhost:8000/api/todo/${id}`, {
        title: title,
        isDone: 1,
      })
      .then((response) => {
        console.log(response.data)
      })
      .then(() => {
        setIsDone(0)
        setTitle('')
        window.location.reload()
      })
      .catch((error) => console.log(error))
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
