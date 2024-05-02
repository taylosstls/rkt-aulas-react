import styles from './App.module.css'

import { ChangeEvent, FormEvent, useState } from 'react'

import { Header } from '@/components/Header/Header'
import { Input } from '@/components/Input/Input'
import { Button } from './components/Button/Button'

import { PlusCircle } from '@phosphor-icons/react'

function App() {
  const [toDos, setToDos] = useState<string[]>([])
  const [newToDoTask, setNewToDoTask] = useState('')

  function handleSubmitComment(event: FormEvent) {
    event.preventDefault()

    setToDos([...toDos, newToDoTask])
    setNewToDoTask('')
  }

  function handleTextToDoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewToDoTask(event.target.value)
  }

  return (
    <>
      <Header />
      <section className={styles.container}>
        <form
          onSubmit={handleSubmitComment}
          className={styles.containerFormWrapper}
        >
          <Input value={newToDoTask} onChange={handleTextToDoChange} required />
          <Button disabled={newToDoTask.length === 0}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </form>
      </section>
    </>
  )
}

export default App
