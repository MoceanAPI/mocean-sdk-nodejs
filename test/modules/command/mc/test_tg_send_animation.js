const chai = require("chai");

const { expect } = chai;
const { TgSendAnimation } = require("../../../../src/modules/command/Mc/index");

describe("tg_send_animation Test", () => {
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
          type: "animation",
          rich_media_url: "test url",
          text: "test text"
      }
    };

    let obj = new TgSendAnimation(params);

    expect(params).to.deep.eq(obj.get());

    obj = new TgSendAnimation();
    obj.from("test id");
    obj.to("test id");
    obj.content("test url","test text");

    expect(params).to.deep.eq(obj.get());
  });

  it("should auto define action", () => {
    obj = new TgSendAnimation();
    obj.from("test id");
    obj.to("test id");
    obj.content("test url","test text");

    expect(obj.get().action).to.eq("send-telegram");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new TgSendAnimation().get();
    }).to.throw();
  });
});
