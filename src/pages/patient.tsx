import axiosService from '../services';
import React from 'react';

const payload = {
  patient: 'Maria 2',
  neighborhood: 'Farol',
  status: 'Ativo',
  priority: 'Urgente',
  days: [1, 4],
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
      PÁGINA DE PACIENTES CADASTRADOS
      <button
        type='button'
        onClick={ send }
      >CRIAR</button>
    </div>
  )
}

export default Patients;
