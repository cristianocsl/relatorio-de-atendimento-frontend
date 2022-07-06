import axiosService from '../services';
import React from 'react';
import PatientsTable from '../components/PatientsTable';

const payload = {
  patient: 'sábado',
  neighborhood: 'Farol',
  status: 'Ativo',
  priority: 'Urgente',
  days: [7],
  serviceGoal: {
    weekly: 3,
    monthly: 12,
  },
  servicePerformed: {
    weekly: 0,
    monthly: 0,
  },
  servicePending: {
    weekly: 0,
    monthly: 0,
  },
  healthInsurance: 'saude & suporte',
  unitPrice: 40.00,
  totalPrice: 0,
  evolution: '',
};
const Patients = () => {
  const send = async () => {
    await axiosService.create(payload);
  }
  return (
    <div>
      <PatientsTable />
      PÁGINA DE PACIENTES CADASTRADOS
      <button
        type='button'
        onClick={ () => send() }
      >CRIAR</button>
    </div>
  )
}

export default Patients;
