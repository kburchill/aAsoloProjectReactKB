import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getCampsites } from '../../store/campsites';
import Campsites from './Campsites';

function parkCampsites() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  
}
