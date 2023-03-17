import "bootstrap/dist/css/bootstrap.css";
import "../css/Chat.css";

export default function Chat11() {
  return (
    <div class="container-fluid h-100">
      <div class="row justify-content-center h-100">
        <div class="col-md-8 col-xl-6 chat">
          <div class="card">
            <div class="card-header msg_head">
              <div class="d-flex bd-highlight">
                <div class="img_cont">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img"
                  />
                  <span class="online_icon"></span>
                </div>
                <div class="user_info">
                  <span>Chat with Khalid</span>
                  <p>1767 Messages</p>
                </div>
              </div>
              <span id="action_menu_btn">
                <i class="fas fa-times-circle"></i>
              </span>
            </div>
            <div class="card-body msg_card_body">
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img_msg"
                  />
                </div>
                <div class="msg_cotainer">
                  Hi, how are you samim?
                  <span class="msg_time">8:40 AM, Today</span>
                </div>
              </div>
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                  Hi Khalid i am good tnx how about you?
                  <span class="msg_time_send">8:55 AM, Today</span>
                </div>
                <div class="img_cont_msg"></div>
              </div>
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img_msg"
                  />
                </div>
                <div class="msg_cotainer">
                  I am good too, thank you for your chat template
                  <span class="msg_time">9:00 AM, Today</span>
                </div>
              </div>
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                  You are welcome
                  <span class="msg_time_send">9:05 AM, Today</span>
                </div>
                <div class="img_cont_msg"></div>
              </div>
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img_msg"
                  />
                </div>
                <div class="msg_cotainer">
                  I am looking for your next templates
                  <span class="msg_time">9:07 AM, Today</span>
                </div>
              </div>
              <div class="d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send">
                  Ok, thank you have a good day
                  <span class="msg_time_send">9:10 AM, Today</span>
                </div>
                <div class="img_cont_msg"></div>
              </div>
              <div class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                  <img
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    class="rounded-circle user_img_msg"
                  />
                </div>
                <div class="msg_cotainer">
                  Bye, see you
                  <span class="msg_time">9:12 AM, Today</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text attach_btn">
                    <i class="fas fa-paperclip"></i>
                  </span>
                </div>
                <textarea
                  name=""
                  class="form-control type_msg"
                  placeholder="Type your message..."
                ></textarea>
                <div class="input-group-append">
                  <span class="input-group-text send_btn">
                    <i class="fas fa-location-arrow"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
