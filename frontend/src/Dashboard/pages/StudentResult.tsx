
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMyResults } from '../../feature/result/resultSlice';
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const StudentResult: React.FC = () => {
    const dispatch = useAppDispatch()
    const { results, isLoading, isError, message} = useAppSelector(
        (state)=> state.result
    )

    useEffect(()=>{
        dispatch(getMyResults())
    },[dispatch])

    useEffect(()=>{
        if (isError) {
          toast.error(message)  
        }
    },[isError, message])

    if (isLoading) {
        return <Spinner/>
    }
  return (
    <div>
      
    </div>
  )
}

export default StudentResult
