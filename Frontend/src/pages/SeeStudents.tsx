import { useState, useEffect, useImperativeHandle } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { Loading } from '../components/common/Loading';

export const SeeStudents = () => {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    return (
        
            <div>
                TESTE PAGINA
            </div>
        
    )
     
}
