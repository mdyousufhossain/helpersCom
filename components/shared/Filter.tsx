interface Props {
  filters: {
    name: string
    value: string
  }[]
  otherclasses?: string
  containerclasses?: string
}

const Filter = ({ filters, otherclasses, containerclasses }: Props) => {
  return (
  <div className={`relative ${containerclasses}`}>
    
    Filter</div>)
}
export default Filter
