export interface cardProps {
  title: string
  content: string
  className?: string
}

const MyCard = ({ title, content, className }: cardProps) => {
  return (
    <div className={`m-2 h-25 w-full rounded-md px-2 py-3 ${className ?? ''}`}>
      <div className="font-bold">{title}</div>
      <p className="text-center text-xl font-bold">{content}</p>
    </div>
  )
}

export default MyCard
