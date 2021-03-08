const chai = require("chai");

const { expect } = chai;
const { TgSendVideo } = require("../../../../src/modules/command/Mc/index");

describe("tg_send_video Test", () => {
  it("should return mc object", () => {
    const params = {
      action: "send-telegram",
      from: {
        type: "bot_username",
        id: "test id"
      },
      to: {
          type: "chat_id",
          id: "test id"
      },
      content: {
          type: "video",
          rich_media_url: "test url",
          text: "test text"
      }
    };
    let obj = new TgSendVideo(params);

    expect(params).to.deep.eq(obj.get());

    obj = new TgSendVideo();
    obj.from("test id");
    obj.to("test id");
    obj.content("test url","test text");

    expect(params).to.deep.eq(obj.get());
  });

  it("should auto define action", () => {
    const obj = new TgSendVideo();
    obj.from("test id");
    obj.to("test id");
    obj.content("test url","test text");

    expect(obj.get().action).to.eq("send-telegram");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new TgSendVideo().get();
    }).to.throw();
  });
});
