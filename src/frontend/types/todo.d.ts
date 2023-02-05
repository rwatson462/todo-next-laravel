
type Tag = {
  name: string,
}

type Todo = {
  id: number,
  title: string,
  completed_at: DateTime|null,
  created_by: User,
  created_at: DateTime,
  tags: Tag[]
}

type RemoteTodoRepository = {
  getAll: () => Promise<Todo[]>,
  create: (data: {title: string, tags: {name: string}[]}) => Promise<Todo>,
  complete: (id: number) => Promise<Todo>
  uncomplete: (id: number) => Promise<Todo>
}
