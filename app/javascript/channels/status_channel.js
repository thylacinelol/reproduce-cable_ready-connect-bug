import consumer from "./consumer"

const createChannel = () => {
  const channel = consumer.subscriptions.create("StatusChannel", {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log('StatusChannel connected');

      setTimeout(() => {
        window.channel.unsubscribe();
        // console.log('StatusChannel unsubscribed');

        // 1) create a channel immediately - sometimes the channel is not created
        window.channel = createChannel();

        // 2) add a delay to allow unsubscribe finish - works ok
        // setTimeout(() => {
        //   window.channel = createChannel();
        // }, 200);
      }, 3000);
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
      console.log('StatusChannel disconnected');
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log('StatusChannel received data ', data);
      document.querySelector('#timer').innerHTML = data.time;
    }
  });

  return channel;
}

document.addEventListener("turbolinks:load", function() {
  window.channel = createChannel();
});
