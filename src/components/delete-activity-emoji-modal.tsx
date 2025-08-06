import { Button } from "../elements/button"

interface IDeleteActivityEmojiModal {
  HandleDeleteActivityEmoji: () => void
  ToggleActivityDeleteEmojiModal: () => void
}

export function DeleteActivityEmojiModal({
  HandleDeleteActivityEmoji,
  ToggleActivityDeleteEmojiModal
} : IDeleteActivityEmojiModal ) {
  
  return (
    <div className='fixed inset-0 flex bg-neutral-950/50'>
      <div 
        className={`m-auto flex flex-col items-center gap-3 px-6 py-3 
        rounded-xl border border-purple-200 bg-neutral-800 shadow-purple-subtle`}
      >
        <span className='text-purple-100 font-bold tracking-wider'>Deseja excluir a atividade?</span>
        <div className='flex items-center gap-3'>
          <Button
            onClick={HandleDeleteActivityEmoji}
          >
            Confirmar
          </Button>
          
          <Button
            onClick={ToggleActivityDeleteEmojiModal}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}