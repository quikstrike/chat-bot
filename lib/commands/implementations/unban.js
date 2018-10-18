const _ = require('lodash');
const Command = require('../command-interface');
const CommandOutput = require('../command-output');
const { makeUnban } = require('../../chat-utils/punishment-helpers');

function unmute(input, services) {
  const matched = /(\w+)/.exec(input);
  const userToUnban = _.get(matched, 1, '').toLowerCase();
  if (_.isEmpty(userToUnban)) {
    return new CommandOutput(new Error('User was empty.'), `Something did not work. ${userToUnban} not unmuted:`);
  }
  services.punishmentStream.write(makeUnban(userToUnban, `Unbanning ${userToUnban}`));
  return new CommandOutput(null, null, null);
}

module.exports = new Command(unmute, false, false, /(\w+)/, null);