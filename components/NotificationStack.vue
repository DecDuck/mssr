<template>
  <div
    aria-live="assertive"
    class="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <TransitionGroup
        enter-active-class="transition duration-500"
        enter-from-class="translate-x-[200%]"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-500"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-[200%]"
      >
        <div
          v-for="[notifId, notif] in Object.entries(notifications)"
          :key="notifId"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <InformationCircleIcon
                  v-if="notif.type == 'TEXT'"
                  class="h-6 w-6 text-blue-400"
                  aria-hidden="true"
                />
                <ExclamationTriangleIcon
                  v-else-if="notif.type == 'ERROR'"
                  class="h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
                <div v-else role="status">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 animate-spin text-transparent fill-blue-600 p-1"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  :class="[
                    'text-sm font-medium',
                    notif.type == 'ERROR' ? 'text-red-600' : 'text-gray-900',
                  ]"
                >
                  {{ notif.name }}
                </p>
                <p v-if="notif.content" class="mt-1 text-sm text-gray-500">
                  {{ notif.content }}
                </p>
                <div
                  v-if="notif.progress"
                  class="h-2 mt-1 w-full bg-gray-100 rounded-xl overflow-hidden"
                >
                  <div
                    :style="{ width: `${notif.progress}%` }"
                    class="bg-blue-600 h-full transition-all"
                  />
                </div>
              </div>
              <div v-if="notif.dismissible" class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="() => delete notifications[notifId]"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { useNotifications } from "~/composables/notificationStack";

const notifications = useNotifications();
</script>
