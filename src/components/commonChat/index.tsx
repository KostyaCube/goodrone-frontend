import React, { useEffect, useState, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Button, OuterContainer, InnerContainer, InputContainer } from './styles';
import { Input } from 'antd';

export default function Chat({ token }: { token: string }) {
  const { data } = useGetMessagesQuery({});
  const [createMessage] = useCreateMessageMutation();

  const [activeKey, setActiveKey] = useState([]);
  const [messages, setmessages] = useState<IChatMessage[]>([]);
  const [text, settext] = useState('');

  const end = useRef<any>(null);

  const socket = useSocket();

  const executeScroll = () => {
    if (end.current) {
      const container = end.current;
      container.scrollTop = container.scrollIntoView();
    }
  };

  useEffect(() => {
    if (socket && name && token) {
      socket.emit('joinRoom', commonAppRoomId);

      const handleConnect = () => {
        console.log(name, 'connected');
      };

      const handleNewMessage = (message: IChatMessage) => {
        if (message.roomId === commonAppRoomId) {
          setmessages((old) => [...old, message]);
        }
      };

      socket.on('connect', handleConnect);
      socket.on('newMessage', handleNewMessage);

      return () => {
        socket.off('connect', handleConnect);
        socket.off('newMessage', handleNewMessage);
      };
    }
  }, [socket, name, commonAppRoomId, token]);

  useEffect(() => {
    if (data) {
      setmessages(
        data.map((item) => {
          return { id: `${item.id}`, user: item.user.name, actionType: item.type, message: item.message };
        })
      );
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      executeScroll();
    }, 100);
  }, [messages, activeKey]);

  function sendMessage() {
    if (text.trim().length > 0) {
      const newMessage = {
        id: `${Date.now()}`,
        user: name,
        actionType: ActionType.message,
        message: text,
        roomId: commonAppRoomId
      };
      socket.emit('message', newMessage, commonAppRoomId);
      try {
        createMessage({ message: text, user: myID, type: ActionType.message });
      } catch (err) {
        console.error(err);
      }
    }
    settext('');
  }

  return (
    <OuterContainer style={{ bottom: `${activeKey.length > 0 ? '-4px' : '0'}` }}>
      <Collapse
        onChange={(key) => {
          setActiveKey(key as any);
        }}
        activeKey={activeKey}
        style={{ background: '#FFF' }}
        expandIconPosition="end"
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 0 : 180} />}
        items={[
          {
            key: '1',
            label: `Messages ${''}`,
            children: (
              <>
                <InnerContainer style={{ paddingBottom: `${token ? '56px' : '8px'}` }}>
                  {messages &&
                    messages.length > 0 &&
                    messages.map((message: IChatMessage) => {
                      return <div key={message.id}>{message.message}</div>;
                    })}
                  <div ref={end} />
                </InnerContainer>
                {token && name && myUUID && socket && (
                  <InputContainer>
                    <Input
                      value={text}
                      onChange={(event) => {
                        settext(event.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      style={{ height: '38px', borderRadius: '8px' }}
                      size="small"
                      placeholder={'Send message'}
                    />
                    <Button
                      onClick={sendMessage}
                      $icon={`${text.trim().length > 0 ? '../src/assets/icons/sendMessageFilled.svg' : '../src/assets/icons/sendMessage.svg'}`}
                    />
                  </InputContainer>
                )}
              </>
            )
          }
        ]}
      />
    </OuterContainer>
  );
}
