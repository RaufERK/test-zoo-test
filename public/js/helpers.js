const subscribe = async (channelId, btn) => {
  const currentSubsAmount = document.getElementById(`subsNum${channelId}`);
  const data = await fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ channelId }),
  });
  if (data.status === 200) {
    btn.textContent = 'unsubscribe';
    currentSubsAmount.textContent = Number(currentSubsAmount.textContent) + 1;
  } else {
    console.log('error');
  }
};

const unsubscribe = async (channelId, btn) => {
  const currentSubsAmount = document.getElementById(`subsNum${channelId}`);

  const data = await fetch('/unsubscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ channelId }),
  });
  if (data.status === 200) {
    btn.textContent = 'subscribe';
    currentSubsAmount.textContent = Number(currentSubsAmount.textContent) - 1;
  } else {
    console.log('error');
  }
};

const loadSubscribers = async (btns) => {
  for (let i = 0; i < btns.length; i += 1) {
    const data = await fetch('/check-subs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ btn: btns[i] }),
    });
    if (data.status === 200) {
      const thisBtn = document.getElementById(btns[i]);
      thisBtn.classList.remove('disabled');
      thisBtn.classList.remove('loading');
      thisBtn.textContent = 'unsubscribe';
    } else {
      const thisBtn = document.getElementById(btns[i]);
      thisBtn.classList.remove('disabled');
      thisBtn.classList.remove('loading');
      thisBtn.textContent = 'subscribe';
    }
  }
};
