const chai = require("chai");

const { expect } = chai;
const {TgRequestContact } = require("../../../../src/modules/command/Mc/index");

describe("tg_request_contact Test", () => {
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
      },
      tg_keyboard: {
          button_request: "contact",
          button_text: "test button text"
      }
    };
    let obj = new TgRequestContact(params);

    expect(params).to.deep.eq(obj.get());

    obj = new TgRequestContact();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");
    obj.button("test button text");

    expect(params).to.deep.eq(obj.get());
  });

  it("should auto define action", () => {
    const obj = new TgRequestContact();
    obj.from("test id");
    obj.to("test id");
    obj.content("test text");
    obj.button("test button text");

    expect(obj.get().action).to.eq("send-telegram");
  });

  it("should throw if required field not set", () => {
    expect(() => {
      new TgSendAnimation().get();
    }).to.throw();
  });
});
