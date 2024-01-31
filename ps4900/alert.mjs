/* Copyright (C) 2023-2024 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

// We added this new file instead of putting this on run.mjs, so we can ensure
// we can attach this listener first before running anything.
addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    // We log the line and column numbers as well since some exceptions (like
    // SyntaxError) do not show it in the stack trace.
    alert(
        `${reason}\n`
        + `${reason.sourceURL}:${reason.line}:${reason.column}\n`
        + `${reason.stack}`
    );
    throw reason;
})

// important that we dynamically import the exploit script after we attach
import('./exploit.mjs');
