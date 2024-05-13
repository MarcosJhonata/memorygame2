import { useState } from 'react'
import './App.css'

interface TCell {
  row: number
  column: number
}

function App() {

  const [grid, setGrid] = useState ([
    [0,3,1,5],
    [1,2,3,4],
    [2,0,4,5],
  ])

  const [isRevealed, setIsRevealed] = useState(new Array(grid.length)
    .fill('')
    .map(() => new Array(grid[0].length).fill(false)))


  const [firstItem,setFirstItem] = useState<TCell>()

    function handleSelectedCard(row: number, column:number) {
      if(isRevealed[row][column]) return
      const clickedNumber = grid[row][column]
      const newIsRevealed = [...isRevealed]
      newIsRevealed[row][column] = true
      setIsRevealed(newIsRevealed)
      
      if (firstItem) {
        const firstCardChosen = grid[firstItem.row][firstItem.column]
        if(firstCardChosen !== clickedNumber){
          setTimeout(() => 
            {
              newIsRevealed[firstItem.row][firstItem.column] = false
              newIsRevealed[row][column] = false
              setIsRevealed([...newIsRevealed])
            },1000)
        
          } 
          else {
            const youWon = isRevealed.flat().every((state) => state)
            if (youWon){
              setTimeout (() => {
                alert("Você Venceu")
              })
             
            }
          }
        setFirstItem(undefined)
      } else {
        setFirstItem({
          row,
          column,
        })
      }
    }

    
  return (
    <>
      <div className='App'>
        <div className='grid'>
       {grid.map((row, rowIndex) => (
        <div className='row'key={rowIndex}>{row.map((number, columnIndex) =>
           <div className={
            'card ' + (isRevealed[rowIndex][columnIndex] ? 'clicked' : '') } key={columnIndex} 
           onClick={() => handleSelectedCard(rowIndex, columnIndex)}>
            {isRevealed[rowIndex][columnIndex] ? number : ''}</div>)}</div> 
       ))}
       </div>
      </div>
     
    </>
  )
}

export default App
