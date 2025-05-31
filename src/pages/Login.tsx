const onLoginSuccess = (user: { role: string; /* … */ }) => {
  // …existing success logic (e.g. set user in store, redirect, etc.)…

  // only show once, only for admin
  if (user.role === 'admin') {
    const shown = localStorage.getItem('adminSuccessToastShown');
    if (!shown) {
      toast.success('הודעה שנשמרה נשלחה בהצלחה!');
      localStorage.setItem('adminSuccessToastShown', 'true');
    }
  }
}
