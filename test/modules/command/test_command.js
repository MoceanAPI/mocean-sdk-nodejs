const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);
const TestingUtils = require("../../testing_utils");
const { Client, Mocean, CommandSnippet, CommandBuilder } = require("../../../src/index");

describe("Command Test", () => {
  const testObj = res => {
    expect(res.status).to.eq(0);
    expect(res.session_uuid).to.be.an("string")
    expect(res.messages).to.be.an("array")
    expect(res.messages[0].action).to.be.an("string");
    expect(res.messages[0].mc_position).to.eq(0);
    expect(res.messages[0].message_id).to.be.an("string");
    expect(res.messages[0].total_message_segments).to.eq(1);
  };

  beforeEach(() => {
    const apiKey = "testapikey";
    const apiSecret = "testapisecret";
    const credentials = new Client(apiKey, apiSecret);
    this.mocean = new Mocean(credentials);
    this.command = this.mocean.command();
    this.command_builder = (new CommandBuilder()).add(CommandSnippet.TgSendText().from("test from").to("test to").content("test content"));
  });

  it("should set params through setter", () => {
    expect(this.command.params).to.not.has.property("mocean-command");
    this.command.setCommand(this.command_builder);
    expect(this.command.params).to.has.property("mocean-command");
    expect(this.command.params["mocean-command"]).to.eq(JSON.stringify(this.command_builder.build()));

    expect(this.command.params).to.not.has.property("mocean-event-url");
    this.command.setEventUrl("test event url");
    expect(this.command.params).to.has.property("mocean-event-url");    
    expect(this.command.params["mocean-event-url"]).to.eq("test event url");

  });

  it("should throw error when required field not set", () => {
    TestingUtils.makeMockRequest("/send-message", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-command": JSON.stringify(this.command_builder.build()),
        });
        return TestingUtils.fileResponse("command.json");
      }
    );

    const commandExecute = () => {
      this.command.execute();
      return true;
    };

    expect(this.command.params).to.not.has.property("mocean-command");
    expect(commandExecute).to.throw();

    this.command.setCommand(this.command_builder);

    expect(commandExecute()).to.be.true;
  });

  it("should accept mcBuilder as mc parameter", () => {
    TestingUtils.makeMockRequest("/send-message", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-command": JSON.stringify(this.command_builder.build())
        });
        return TestingUtils.fileResponse("command.json");
      }
    );

    return this.command
      .setCommand(this.command_builder)
      .execute()
      .then(result => {
        expect(result).to.not.eq(null);
      });
  });

  it("should return callback on execute", () => {
    TestingUtils.makeMockRequest("/send-message", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-command": JSON.stringify(this.command_builder.build())
        });
        return TestingUtils.fileResponse("command.json");
      }
    );

    this.command.setCommand(this.command_builder);

    return new Promise((resolve, reject) => {
      const fake = sinon.fake((err, res) => {
        if (err) {
          return reject(err);
        }
        testObj(res);
        expect(fake).has.been.called;
        return resolve();
      });
      this.command.execute(null, fake);
    });
  });

  it("should return promise on execute", () => {
    TestingUtils.makeMockRequest("/send-message", "POST").reply(
      (uri, requestBody) => {
        TestingUtils.verifyParamsWith(requestBody, {
          "mocean-command": JSON.stringify(this.command_builder.build())
        });
        return TestingUtils.fileResponse("command.json");
      }
    );

    this.command.setCommand(this.command_builder);
    return this.command.execute().then(res => {
      testObj(res);
    });
  });

});
