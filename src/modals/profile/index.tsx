import style from './profile.module.scss'
import Modal from '../../components/modal'
import Select from '../../elements/select'

export default function ModalProfile() {
  return (
    <Modal>
      <h1 className={style.title}>Edit your profile</h1>
      <div>Country</div>
      <Select options={[{ value: 'USA' }, { value: 'Russia' }]} placeholder='Country' />
      <div>Language</div>
      <Select options={[{ value: 'English' }, { value: 'Russian' }]} placeholder='Language' />
      <div>Birthday</div>
      <div className='row center'>
        <input placeholder='day' />
        <input placeholder='month' />
        <input placeholder='year' />
      </div>
    </Modal>
  )
}
