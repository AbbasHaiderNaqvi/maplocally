"use client";
import React, { useEffect } from 'react';

const AdminPage = () => {
  useEffect(() => {
    window.location.href = '/admin/login';
  }, []);

  return (
    <div>
      Redirecting to /admin/login...
    </div>
  );
};

export default AdminPage;
