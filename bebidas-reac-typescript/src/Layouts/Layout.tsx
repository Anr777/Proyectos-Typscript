
import { Outlet } from 'react-router-dom';
import { Header, Modal, Notification } from '../components';
import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

export function Layout() {

  const loadFromStorage = useAppStore( state => state.loadFromStorage)
  // const notification = useAppStore( state => state.notification );

  useEffect( () => {
    loadFromStorage();
  }, []);

  return (
    <>
      <Header />

      <main className=' container mx-auto py-16'>
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  )
}

