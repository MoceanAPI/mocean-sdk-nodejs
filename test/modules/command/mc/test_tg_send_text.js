const chai = require("chai");

const { expect } = chai;
const { TgSendText } = require("../../../../src/modules/command/Mc/index");

describe("tg_send_text Test", () => {
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
          type: "text",
          text: "test text"
      }
    };
    let obj = new TgSendText(params);

    expect(params).to.deep.eq(obj.get());

    obj = new TgSendText();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");

    expect(params).to.deep.eq(obj.get());
  });

  it("should auto define action", () => {
    const obj = new TgSendText();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");

    expect(obj.get().action).to.eq("send-telegram");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new TgSendText().get();
    }).to.throw();
  });
});
